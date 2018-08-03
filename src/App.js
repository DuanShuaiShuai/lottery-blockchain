import React, {Component} from 'react';
import web3 from "./web3";
import  lottery from "./lottery"
import {Button, Container, Message,Card,Icon,Image,Header,Label} from 'semantic-ui-react'


class App extends Component {

    constructor() {
        super();
        this.state = {
            premanager:"",
            endmanager:"",
            count:0,
            poolMoney:0,
            loading:false,
            open:false,
            back:false,
            display:"none"
        };
    }
    async componentDidMount(){
        let account =await web3.eth.getAccounts();
        let address= await lottery.methods.getManager().call();
        if(account[0]===address){this.setState({display:"inline-flex"})}
        let len=address.length;
        let count= await lottery.methods.getNum().call();
        let balance= await lottery.methods.returnSum().call();
        this.setState({poolMoney:web3.utils.fromWei(balance,"ether"),premanager:address.slice(0,len/2), endmanager:address.slice(len/2,len),count,});
    };
    enther=async()=>{
        let account =await web3.eth.getAccounts();
        this.setState({loading:true});
        try{
            await lottery.methods.enther().send({
                from:account[0],
                value:"1000000000000000000"
            });
        }catch (e) {

        }

        this.setState({loading:true});
        window.location.reload(true);
    };
    openWin=async()=>{
        this.setState({open:true});
        let account =await web3.eth.getAccounts();
        try{
            await lottery.methods.getWinner().send({
                from:account[0],
                gas:"1000000"
            });
        }catch (e) {

        }

        this.setState({open:false});
        window.location.reload(true);
    };
    back=async()=>{
        this.setState({back:true});
        let account =await web3.eth.refund();
        try {
            await lottery.methods.getWinner().send({
                from:account[0],
                gas:"1000000"
            })
        }catch (e) {

        }

        this.setState({back:false});
        window.location.reload(true);
    };
    render() {
        return (
            <Container>

                    <Message>
                        <Message.Header> 区块链博彩，更公平、透明、公正！</Message.Header>
                        <p>
                            都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！ 都快来买啊！！！！！！！！
                        </p>
                    </Message>

                <Card>
                    <Card.Content  textAlign={"center"}>
                        <Card.Header>双色球</Card.Header>
                    </Card.Content>
                    <Image src='/images/logo.jpg' />
                    <Card.Content>
                        <Card.Header>奖池金额:</Card.Header>
                        <Card.Meta textAlign="right">
                            <Header size='huge' textAlign="center" color="red">{this.state.poolMoney}</Header>Ether</Card.Meta>
                        <Card.Description>管理员地址:
                            <Label horizontal>
                                <Label  horizontal>
                                    {this.state.premanager}
                                </Label>
                                <Label  horizontal>
                                    {this.state.endmanager}
                                </Label>
                            </Label>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {this.state.count}人参与
                        </a>
                    </Card.Content>
                    <Button negative onClick={this.enther}   loading={this.state.loading}>
                        投注就中奖</Button>
                    <Button.Group color='blue' style={{"display":this.state.display}}>
                        <Button onClick={this.openWin} loading={this.state.open}>开奖</Button>
                        <Button onClick={this.back} loading={this.state.back}>退款</Button>
                    </Button.Group>
                </Card>
            </Container>
        );
    }

}

export default App;


