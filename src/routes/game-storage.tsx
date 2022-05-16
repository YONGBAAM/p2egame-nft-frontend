import { Grid } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { ICardProps } from '../components/CharacterCard';
import GameCard from '../components/GameCard';

interface gameStorageProps {
    account:string
}

// interface apiInventory {
//     gold:number;
//     item:iitem[];
// }

interface iitem {
    count:number;
    nftId:number;
}
const GameStorage:FC<gameStorageProps> = ({
    account
}) => {

    const apiEndpoint = process.env.REACT_APP_API_HOST;

    const [cardArray, setCardArray] = useState<ICardProps[]>([
        {nftId:500, type:33, lot:0}
    ]);

    const getItemList =  async () => {
        try {
            const response = await axios
            .post( "/api/v2/items/get/" , 
            {"contract":process.env.REACT_APP_CONTRACT_DEPLOYED_ADDRESS, 
        "walletAddress":account}
        

            )
            const tt: ICardProps[] = [];
            console.log(response)
            response.data['items'].map((v: iitem) => {
                tt.push({nftId:v.nftId, type:0, lot:v.count})
            })
            setCardArray(tt)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect( () => {
        getItemList()
    }, []

    );

  return (
    <>
    <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
        {cardArray &&
            cardArray.map((v, i) => {
                return (
                    <GameCard
                        key={i}
                        nftId={v.nftId}
                        type={v.type}
                        account={account}
                        lot = {v.lot}
                    />
                );
            })}
    </Grid>
</>
  )
}

export default GameStorage