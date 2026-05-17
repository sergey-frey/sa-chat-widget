import * as v from "valibot";
import { apiInstance } from "@/shared/api";
import {
  GetMessagesResponseSchema,
  SendMessageResponseSchema,
  type IGetMessagesPayload,
  type IGetMessagesResponse,
  type ISendMessagePayload,
  type ISendMessageResponse,
} from "./schemas";

export const messagesService = {
  async getMessages(
    payload: IGetMessagesPayload,
  ): Promise<IGetMessagesResponse> {
    const response = await apiInstance
      .get(`products/${payload.productId}/messages`, {
        searchParams: { user_chat_id: payload.userChatId },
      })
      .json();

    return v.parse(GetMessagesResponseSchema, response);
  },

  async sendMessage(
    payload: ISendMessagePayload,
  ): Promise<ISendMessageResponse> {
    const response = await apiInstance
      .post(`products/${payload.productId}/messages`, {
        json: {
          user_chat_id: payload.userChatId,
          content: payload.content,
        },
      })
      .json();

    return v.parse(SendMessageResponseSchema, response);
  },
};
