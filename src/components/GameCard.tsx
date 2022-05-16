import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { AlertDialogBody } from '@chakra-ui/react'
import axios from 'axios'
import React, { FC, useState } from 'react'
import CharacterCard, { ICardProps } from './CharacterCard'

interface GameCardProps extends ICardProps {
    account: string
};

const NftCard: FC<GameCardProps> = (props) => {
    const [activated, setActivated] = useState<boolean>(true);

    const account = props.account;
    const nftId = props.nftId;
    const onClickRetrieval = async () => {
        setActivated(false)

        const body = {
            "contract":process.env.REACT_APP_CONTRACT_DEPLOYED_ADDRESS,
            "walletAddress":account,
            "nftId":""+nftId
        }
        const result = await axios
        .post( "/api/chain/withdrawal", body);
        console.log(result);      
    }

    return (
        <Box textAlign="center" w={150} >
            <CharacterCard nftId={props.nftId} type={props.type} lot = {props.lot}/>
            <Button disabled={!activated} size="sm" colorScheme="blue" mt={2} onClick={onClickRetrieval} display="inline-block">
                to NFT
            </Button>
        </Box>
    )
}

export default NftCard