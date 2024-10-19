import { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../../services/comentarios.js";
import { IdComentario } from "../../../types/comentario.js";
import { IdTema } from "../../../types/tema.js";

const comentariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Obtener un comentario especifico",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - response. \n - Solo admin tiene permisos.",
      tags: ["comentarios"],
      params: IdComentario,
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_comentario } = request.params as typeof IdComentario;
      return comentarioService.findById(id_comentario);
    },
  });

  fastify.put("/", {
    schema: {
      summary: "Editar un comentario especifico",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - body \n " +
        " - response. \n - Solo admin tiene permisos.",
      tags: ["comentarios"],
      params: IdComentario,
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_comentario } = request.params as typeof IdComentario;
      const { descripcion } = request.body as { descripcion: string };
      const { id_tema } = request.query as IdTema;
      return comentarioService.modify(id_tema, id_comentario, descripcion);
    },
  });

  fastify.delete("/", {
    schema: {
      summary: "Borrar un comentario especifico",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - response. \n - Solo admin tiene permisos.",
      tags: ["comentarios"],
      params: IdComentario,
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_comentario } = request.params as typeof IdComentario;
      const { id_tema } = request.query as IdTema;
      return comentarioService.erase(id_tema, id_comentario);
    },
  });
};

export default comentariosRoutes;
