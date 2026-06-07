import * as v from "valibot";
import { apiInstance } from "@/shared/api";
import {
  GetMessagesResponseSchema,
  type IGetMessagesPayload,
  type IGetMessagesResponse,
  type ISendMessagePayload,
  type ISendMessageResponse,
  SendMessageResponseSchema,
} from "./schemas";

function throwParseError(
  issues: readonly [v.BaseIssue<unknown>, ...v.BaseIssue<unknown>[]],
): never {
  const flat = v.flatten(issues);
  throw new Error(`Schema validation failed: ${JSON.stringify(flat, null, 2)}`);
}

export const messagesService = {
  async getMessages(
    payload: IGetMessagesPayload,
  ): Promise<IGetMessagesResponse> {
    const response = await apiInstance
      .get<IGetMessagesResponse>(`products/${payload.productId}/messages`, {
        searchParams: { user_chat_id: payload.userChatId },
      })
      .json();

    const result = await v.safeParseAsync(GetMessagesResponseSchema, response);

    if (!result.success) throwParseError(result.issues);

    return result.output;
  },

  async sendMessage(
    payload: ISendMessagePayload,
  ): Promise<ISendMessageResponse> {
    const response = await apiInstance
      .post(`products/${payload.productId}/messages`, {
        json: {
          user_chat_id: payload.userChatId,
          ...(payload.content !== undefined && { content: payload.content }),
          ...(payload.contact !== undefined && { contact: payload.contact }),
        },
      })
      .json();

    const result = await v.safeParseAsync(SendMessageResponseSchema, response);

    if (!result.success) throwParseError(result.issues);

    return result.output;
  },
};
