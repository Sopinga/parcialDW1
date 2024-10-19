import { Static, Type } from "@sinclair/typebox";

export const IdComentario = Type.Object({
  id_comentario: Type.Integer({
    description: "Identificador único del comentario",
  }),
});
export const Comentario = Type.Object(
  {
    id_comentario: Type.Integer(),
    id_usuario: Type.Integer(),
    id_tema: Type.Integer(),
    descripcion: Type.String({ description: "Comentario del usuario" }),
    fecha_ingresado: Type.String({
      description: "Fecha de ingresado del comentario",
    }),
  },
  {
    examples: [
      {
        comentario: "Comentario de prueba 1",
      },
      {
        comentario: "Comentario de prueba 2",
      },
    ],
  }
);

export type Comentario = Static<typeof Comentario>;

export const ComentarioPut = Type.Pick(Comentario, ["descripcion"]);
export type ComentarioPut = Static<typeof ComentarioPut>;
