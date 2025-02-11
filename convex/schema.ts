import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    content: v.string(),
    timestamp: v.number(),
    chatId: v.id("chats"),
    isEdited: v.optional(v.boolean()),
    editedAt: v.optional(v.number()),
    reactions: v.optional(
      v.array(
        v.object({
          emoji: v.string(),
          timestamp: v.number(),
        })
      )
    ),
    attachmentIds: v.optional(v.array(v.id("attachments"))),
    replyTo: v.optional(v.id("messages")),
    status: v.optional(
      v.union(v.literal("sent"), v.literal("delivered"), v.literal("read"))
    ),
  }),

  chats: defineTable({
    type: v.union(v.literal("direct"), v.literal("group")),
    createdAt: v.number(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    avatar: v.optional(v.string()),
    lastMessageAt: v.optional(v.number()),
    pinnedMessageIds: v.optional(v.array(v.id("messages"))),
    metadata: v.optional(
      v.object({
        key: v.string(),
      })
    ),
  }),

  attachments: defineTable({
    messageId: v.id("messages"),
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
  }),
});
