pragma solidity ^0.4.17;
contract  Lottery1{
    //管理者
    address public manager;
    //玩家
    address[] public  players;
    //获胜者
    address public winer;
    //构造函数初始化
    function Lottery1() public{
        manager=msg.sender;
    }
    //获取管理员账户地址
    function getManager() public  view returns(address){
        return manager;
    }
    //获取参与人数/投注数
    function getNum() public view returns(uint){
        return players.length;
    }
    //返回投注人
    function getAllPalyer() public view returns(address[]){
        return players;
    }
    //投注
    function enther() public payable{
        require(msg.value==1 ether);
        players.push(msg.sender);
    }
    //产生随机数
    function random() private  view returns(uint){
        return uint(keccak256(block.difficulty,now,players,players.length))%players.length;
    }
    //开奖
    function getWinner() public   requireManager returns(address){
        winer=players[random()];
        winer.transfer(this.balance);
        players=new address[](0);
        return winer;
    }
    //退款
    function refund() public  requireManager{
        for(uint i=0;i<players.length;i++){
            players[i].transfer(1 ether);
        }
        players=new address[](0);
    }
    //返回奖池金额
    function returnSum() public view returns(uint) {
        return this.balance;
    }
    modifier requireManager(){
        //必须是管理员
        require(msg.sender==manager);
        _;
    }
}