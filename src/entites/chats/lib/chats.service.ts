import * as v from "valibot";
import { apiInstance } from "@/shared/api";
import {
  CreateChatResponseSchema,
  GetMessagesResponseSchema,
  type ICreateChatPayload,
  type ICreateChatResponse,
  type IGetMessagesPayload,
  type IGetMessagesResponse,
  type ISendMessagePayload,
  type ISendMessageResponse,
  SendMessageResponseSchema,
} from "./schemas";

export const chatsService = {
  async createChat(payload: ICreateChatPayload): Promise<ICreateChatResponse> {
    const response = await apiInstance
      .post(`products/${payload.productId}/chats`)
      .json();

    return v.parse(CreateChatResponseSchema, response);
  },

  async getMessages(
    payload: IGetMessagesPayload,
  ): Promise<IGetMessagesResponse> {
    const response = await apiInstance
      .get(`chats/${payload.chatId}/messages`)
      .json();

    return v.parse(GetMessagesResponseSchema, response);
  },

  async sendMessage(
    payload: ISendMessagePayload,
  ): Promise<ISendMessageResponse> {
    const response = await apiInstance
      .post(`chats/${payload.chatId}/messages`, {
        json: {
          content: payload.content,
        },
      })
      .json();

    return v.parse(SendMessageResponseSchema, response);
  },
};
