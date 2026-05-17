import * as v from "valibot";

export const RolesEnumSchema = v.picklist(["user", "assistant"]);

export type IRole = v.InferInput<typeof RolesEnumSchema>;

export const MessageSchema = v.object({
  id: v.number(),
  product_id: v.number(),
  user_chat_id: v.string(),
  role: RolesEnumSchema,
  content: v.string(),
  created_at: v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/)),
});

export type IMessage = v.InferInput<typeof MessageSchema>;
