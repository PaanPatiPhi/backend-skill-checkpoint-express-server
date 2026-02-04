/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         question_id:
 *           type: integer
 *           example: 3
 *         content:
 *           type: string
 *           example: "This is an answer"
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     AnswerListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Answer"
 */
