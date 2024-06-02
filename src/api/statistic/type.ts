export interface TuserData {
    agent: {
        disable: TItem[]
        normal: TItem[]
    },
    agent_consume: {
        amount: string,
        agent_username: string
    }[],
    member: {
        disable: TItem[]
        normal: TItem[]
    },
    member_rank: {
        amount: string,
        agent_username: string
    }[]

}


type TItem = {
    num: number,
    data: number
}
