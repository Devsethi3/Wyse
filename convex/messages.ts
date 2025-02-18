import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();
  },
});

export const get = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.messageId);
  },
});

export const send = mutation({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
    replyTo: v.optional(v.id("messages")),
    attachments: v.optional(
      v.array(
        v.object({
          type: v.union(
            v.literal("image"),
            v.literal("file"),
            v.literal("video"),
            v.literal("audio")
          ),
          url: v.string(),
          fileName: v.optional(v.string()),
          fileSize: v.optional(v.number()),
          mimeType: v.optional(v.string()),
          duration: v.optional(v.number()),
          dimensions: v.optional(
            v.object({
              width: v.number(),
              height: v.number(),
            })
          ),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();

    // Create attachments if
    const attachmentIds = [];
    if (args.attachments) {
      for (const attachment of args.attachments) {
        const attachmentId = await ctx.db.insert("attachments", {
          ...attachment,
          messageId: undefined as any, // Will be updated after message creation
        });
        attachmentIds.push(attachmentId);
      }
    }

    // Create the message
    const messageId = await ctx.db.insert("messages", {
      content: args.content,
      chatId: args.chatId,
      timestamp,
      status: "sent",
      replyTo: args.replyTo,
      attachmentIds: attachmentIds.length > 0 ? attachmentIds : undefined,
    });

    // Update attachments with messageId
    for (const attachmentId of attachmentIds) {
      await ctx.db.patch(attachmentId, { messageId });
    }

    // Update chat's lastMessageAt
    await ctx.db.patch(args.chatId, { lastMessageAt: timestamp });

    return messageId;
  },
});

export const edit = mutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
      isEdited: true,
      editedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);

    // Delete attachments if any
    if (message?.attachmentIds) {
      for (const attachmentId of message.attachmentIds) {
        await ctx.db.delete(attachmentId);
      }
    }

    // Delete the message
    await ctx.db.delete(args.messageId);
  },
});

export const addReaction = mutation({
  args: {
    messageId: v.id("messages"),
    emoji: v.string(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    const reactions = message?.reactions || [];
    await ctx.db.patch(args.messageId, {
      reactions: [...reactions, { emoji: args.emoji, timestamp: Date.now() }],
    });
  },
});

export const removeReaction = mutation({
  args: {
    messageId: v.id("messages"),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    const reactions = message?.reactions || [];
    await ctx.db.patch(args.messageId, {
      reactions: reactions.filter(
        (reaction) => reaction.timestamp !== args.timestamp
      ),
    });
  },
});

export const updateStatus = mutation({
  args: {
    messageId: v.id("messages"),
    status: v.union(
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { status: args.status });
  },
});
