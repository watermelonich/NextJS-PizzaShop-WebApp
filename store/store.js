import create from 'zustand'

export const useStore=create(
    (set)=>({
        //cart
        cart:{
            pizzas:[]
        },


        //add Pizza in cart
        addPizza: (data)=>
            set((state)=>({
                cart:{
                    pizzas:[...state.cart.pizzas,data]
                }
            })),


        //Remove pizza
        removePizza: (index)=>set((state)=>({
           cart:{
              //_ refers to each pizza
              pizzas: state.cart.pizzas.filter((_,i) => i !=index)
           }
        })),

        //Remove Cart Pizza after order place
        resetCart: () => set(()=>({
            cart: {
                pizzas:[]
            }
        }))
    })
)