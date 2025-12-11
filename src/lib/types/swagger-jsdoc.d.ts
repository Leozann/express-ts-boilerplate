declare module 'swagger-jsdoc' {
  export interface Options {
    definition: any
    apis: string[]
  }

  export default function swaggerJsdoc(options: Options): any
}
