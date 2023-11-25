// clientes/livros-react/src/Interface/LivroMongo.ts
interface LivroMongo {
    _id: string | null;
    titulo: string;
    codEditora: number;
    resumo: string;
    autores: string[];
  }
  
  export default LivroMongo;
  