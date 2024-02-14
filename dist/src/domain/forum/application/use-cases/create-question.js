"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionUseCase = void 0;
const question_1 = require("../../enterprise/entities/question");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const either_1 = require("../../../../core/either");
const question_attachment_1 = require("../../enterprise/entities/question-attachment");
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
class CreateQuestionUseCase {
    questionsRepository;
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ authorId, title, content, attachmentsIds, }) {
        const question = question_1.Question.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            title,
            content,
        });
        const questionAttachments = attachmentsIds.map((attachmentId) => {
            return question_attachment_1.QuestionAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                questionId: question.id,
            });
        });
        question.attachments = new question_attachment_list_1.QuestionAttachmentList(questionAttachments);
        await this.questionsRepository.create(question);
        return (0, either_1.right)({
            question,
        });
    }
}
exports.CreateQuestionUseCase = CreateQuestionUseCase;
//# sourceMappingURL=create-question.js.map