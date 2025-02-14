import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("chats").order("desc").collect();
  },
});

export const get = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});

//
export const create = mutation({
  args: {
    type: v.union(v.literal("direct"), v.literal("group")),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      type: args.type,
      name: args.name,
      description: args.description,
      avatar: args.avatar,
      createdAt: Date.now(),
    });
    return chatId;
  },
});

export const update = mutation({
  args: {
    chatId: v.id("chats"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { chatId, ...updates } = args;
    await ctx.db.patch(chatId, updates);
  },
});

export const remove = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    // Delete all messages in the chat
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();

    for (const message of messages) {
      // Delete attachments for each message
      if (message.attachmentIds) {
        for (const attachmentId of message.attachmentIds) {
          await ctx.db.delete(attachmentId);
        }
      }
      await ctx.db.delete(message._id);
    }

    // Finally delete the chat
    await ctx.db.delete(args.chatId);
  },
});

export const pinMessage = mutation({
  args: {
    chatId: v.id("chats"),
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    const pinnedMessageIds = chat?.pinnedMessageIds || [];
    await ctx.db.patch(args.chatId, {
      pinnedMessageIds: [...pinnedMessageIds, args.messageId],
    });
  },
});

export const unpinMessage = mutation({
  args: {
    chatId: v.id("chats"),
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    const pinnedMessageIds = chat?.pinnedMessageIds || [];
    await ctx.db.patch(args.chatId, {
      pinnedMessageIds: pinnedMessageIds.filter((id) => id !== args.messageId),
    });
  },
});
