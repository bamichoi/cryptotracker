import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Title = styled.h1`
     color: ${props => props.theme.textColor};
     font-size: 48px;
     margin-bottom: 30px;
     margin-top: 30px;
`;

const Container = styled.div`
    padding:0px 10px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    
    a {
        transition: color 0.2s ease-in-out;
        padding: 20px;
        display: flex;
        align-items: center;
    }
    
    &:hover {
        a{
            color:${props => props.theme.accentColor}
        }
    }
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 15px;
`;

interface ICoin {
    "id": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "is_new": boolean,
    "is_active": boolean,
    "type": string
}
function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
    /* const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []) */
    return <Container>
         <Helmet>
            <title>CrpytoTracker | Coins </title>
        </Helmet>
        <Header>
            <Title>
                Coins
            </Title>
        </Header>
        { isLoading ? ( <Loader >Loading...</Loader>) : 
            (<CoinsList>
                {data?.slice(0, 100).map((coin) => (
                <Coin key={coin.id}>
                    <Link to={{
                                pathname:`/${coin.id}`,
                                state: { name: coin.name },
                            }}
                            >
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;
                    </Link>
                </Coin>
                ))}
            </CoinsList> 
        )}
    </Container>
}

export default Coins;