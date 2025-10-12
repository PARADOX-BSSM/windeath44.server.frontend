import ame from '@/assets/profile/ame.svg'
import choten from '@/assets/profile/choten.svg'

export const ChatList = [
    {chat_id : 1, user_name : '로에나', user_id : "aaaa", text : '당고 어쩌고 저쩌고', profile : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYO-_eJmT_B4H0jANmcfcKlqnyhCFUedKWQ&s', like:13, isChild : false, child_chat : 23},
    {chat_id : 2, user_name : '아메', user_id : "ame", text : '벌써 죽었네 어쩌고 저쩌고', profile : 'https://opgg-static.akamaized.net/meta/images/lol/15.20.1/champion/Teemo.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1520', like:124, isChild : false, child_chat : 3},
    {chat_id : 1, user_name : '아메', user_id : "ame", text : '당고 겁나 마시씀', profile : 'https://opgg-static.akamaized.net/meta/images/lol/15.20.1/champion/Teemo.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1520', like:32, isChild : true, child_chat:45, parent_id : 1},
    
]

/*
chat_id : number
user_name : string
user_id : string
text : string
profile : string

like : number

isChild : boolean
child_chat? : number
parent_id? : number
*/