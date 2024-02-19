"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.converstation = void 0;
const Yup = __importStar(require("yup"));
const yup_1 = require("yup");
exports.converstation = {
    conversationMessageCreate: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required('Type is required'),
            conversationId: (0, yup_1.string)().required('conversation ID is required'),
            data: (0, yup_1.object)({
                type: (0, yup_1.string)().required('Conversation data-type is required'),
                text: (0, yup_1.string)().required('Conversation text is required')
            }).required()
        })
    }),
    create: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required('Type is required'),
            name: (0, yup_1.string)().required('Name is required'),
            members: Yup.array()
                .min(1, 'Min of 1 members are allowed')
                .required('Members are required')
        })
    }),
    read: {
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required('ID is required')
        })
    },
    list: (0, yup_1.object)({
        body: (0, yup_1.object)({
        // id: string().required("ID is required"),
        })
    }),
    history: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required('ID is required')
        })
    }),
    update: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required('ID is required'),
            name: (0, yup_1.string)().required('Name is required')
        })
    }),
    addUser: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required('ID is required'),
            userId: (0, yup_1.string)().required('User is required')
        })
    }),
    removeUser: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required('ID is required'),
            name: (0, yup_1.string)().required('Name is required')
        })
    }),
    delete: {}
};
