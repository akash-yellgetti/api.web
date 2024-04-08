import * as express from 'express';
import { contactService, conversationMemberService, conversationService } from '../service';
import { Api, api, log } from '../utils';
import _ from 'lodash';
import c from 'config';
import { conversation } from '../route';
import mongoose from 'mongoose';

class Contact {

  list = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params};
    const user: any = request.user;
    log.info('controller.contact.list');
    try {
      const data = await contactService.read({ userId: user._id });
      return new Api(response).success().code(200).send({ data });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  }

  create = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    inputs.userId = request.user._id;
    log.info('controller.contact.created');
    try {
      const user = await contactService.create(inputs);
      return new Api(response).success().code(200).send({  data:  user, message: "created Succesful" });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.contact.created', { ...e });
      return new Api(response).error().code(code).send({ ...e });
    }
  }

  detail = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const detail = await contactService.readOne({ _id: inputs._id });
      console.log('detail', detail);
      const payload = { code: 200, data: detail, message: 'contact detail' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };


  refresh = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.contact.refresh');
    try {
      const userContacts: any = await contactService.read({ userId: new mongoose.Types.ObjectId(user._id) });
      for(let i in userContacts) {
        const contact = userContacts[i];
        console.log('refUser', contact.refUser);
        if(contact && contact.refUser) {
          const conversation = await conversationService.getConversation({ type: 'individual', user, refUser: contact.refUser });
          console.log('conversation', conversation);
          if(conversation) {
            const conversation = await conversationService.create({ type: 'individual'  });
            const conversationMember = await conversationMemberService.bulkCreate([
              { conversationId: conversation._id, userId: user._id },
              { conversationId: conversation._id, userId: contact.refUser._id }
            ]);
            contact.conversationId = conversation._id;
            contactService.updateOne({ _id: contact._id, userId: new mongoose.Types.ObjectId(user._id) }, { conversationId: conversation._id});
          }
        }

      }
      const payload = { code: 200, data: userContacts, message: 'contact refresh' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  }
}

export const ContactController = new Contact();
