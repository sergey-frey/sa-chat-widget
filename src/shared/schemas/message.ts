import * as v from "valibot";

export const RolesEnumSchema = v.picklist(["user", "assistant"]);

export type IRole = v.InferInput<typeof RolesEnumSchema>;

export const MessageSchema = v.object({
  id: v.number(),
  chat_id: v.number(),
  role: RolesEnumSchema,
  content: v.string(),
  created_at: v.pipe(v.string(), v.isoDateTime()),
});

export type IMessage = v.InferInput<typeof MessageSchema>;
