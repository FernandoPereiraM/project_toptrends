
//Query models to use in the querymaker from api
export interface Query{
    query_name:string
    query_comentary:string
    country_name:string
    es_date:Date
    id: number
    is_orderRank:boolean
    is_today:boolean
    is_orderScore:boolean
    is_top_rising:boolean
    is_top_term:boolean
    user_name:string
  }


//Comment models of the querys
  export interface Coment{
    id: number,
    user_com: string,
    user_name: string,
    query: number
  }


