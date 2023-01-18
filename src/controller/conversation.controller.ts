import * as express from 'express';
import {
  conversationService,
  conversationMemberService,
  conversationMessageService
} from '../service';
import { Api, log } from '../utils';
import _ from 'lodash';
import { app } from '../config/app';

class Conversation {
  list = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const conversations: any = await conversationMemberService.getConversations(inputs, user);
      const payload = { data: conversations, message: 'conversation list.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  history = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      let conversationMessages: any = await conversationMessageService.read({
        conversationId: inputs.id
      });
      const payload = {
        data: conversationMessages,
        message: 'conversation history.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  create = async (request: any, response: express.Response) => {
    const inputs: any = _.pick({ ...request.body, ...request.params }, [
      'name',
      'members'
    ]);
    const name: string = inputs && inputs.name ? inputs.name : '';
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const conversation: any = await conversationService.create({
        type: 'group',
        name,
        createdBy: user._id,
        updatedBy: user._id
      });
      const conversationMembers = await conversationMemberService.addUsers(
        inputs.members,
        conversation._id,
        user._id
      );
      const payload = {
        code: 200,
        data: { group: conversation, groupMembers: conversationMembers },
        message: 'Group created.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  update = async (request: any, response: express.Response) => {
    const inputs: any = _.pick({ ...request.body, ...request.params }, [
      'name'
    ]);
    const name: string =
      inputs && inputs.name ? inputs.name + '-' + new Date().getTime() : '';
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const conservation: any = await conversationService.updateOne(
        { name, updatedBy: user._id },
        { _id: inputs.id }
      );

      const payload = {
        code: 200,
        data: { conservation },
        message: 'Group created.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };

  conversationMessageCreate = async (
    request: any,
    response: express.Response
  ) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const conversationMessage = await conversationMessageService.create({
        userId: user._id,
        type: inputs.data.type,
        text: inputs.data.text,
        conversationId: inputs.conversationId,
        createdBy: user._id,
        updatedBy: user._id
      });
      const payload = {
        data: { conversationMessage },
        message: 'conversation created successfully.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };
}

export const ConversationController = new Conversation();
