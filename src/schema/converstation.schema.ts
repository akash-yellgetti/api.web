import * as Yup from 'yup';
import { object, string, ref } from 'yup';

export const converstation = {
  conversationMessageCreate: object({
    body: object({
      type: string().required('Type is required'),
      conversationId: string().required('conversation ID is required'),
      data: object({
        type: string().required('Conversation data-type is required'),
        message: string().required('Conversation text is required')
      }).required()
    })
  }),
  create: object({
    body: object({
      type: string().required('Type is required'),
      name: string().required('Name is required'),
      members: Yup.array()
        .min(1, 'Min of 1 members are allowed')
        .required('Members are required')
    })
  }),
  read: {
    body: object({
      id: string().required('ID is required')
    })
  },
  list: object({
    body: object({
      // id: string().required("ID is required"),
    })
  }),
  history: object({
    body: object({
      id: string().required('ID is required')
    })
  }),
  update: object({
    body: object({
      id: string().required('ID is required'),
      name: string().required('Name is required')
    })
  }),
  addUser: object({
    body: object({
      id: string().required('ID is required'),
      userId: string().required('User is required')
    })
  }),
  removeUser: object({
    body: object({
      id: string().required('ID is required'),
      name: string().required('Name is required')
    })
  }),
  delete: {}
};
