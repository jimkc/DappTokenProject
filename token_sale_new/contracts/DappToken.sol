pragma solidity >=0.4.21 <0.6.0;

//Functions and variables here need to follow ERC20 statndrd

contract DappToken {
	string public name = "DApp Token";
	string public symbol = "DAPP";
	//not part of ERC20
	string public standard = "DApp Token V1.0"; 
	uint256 public totalSupply;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	); 
	

	mapping (address => uint256) public balanceOf;
	
	constructor (uint256 _initialSupply) public {
		// msg.sender is the address of person/contract interacting to the contract
		balanceOf[msg.sender] = _initialSupply; 
		//state variable
		totalSupply = _initialSupply; 
	}

	// TODO:
	// Transfer
	function transfer (address _to, uint256 _value) public returns(bool success){
		// Exception if the account doesn't have enough
		require(balanceOf[msg.sender] >= _value);
		// Transfer the balances
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		
		emit Transfer(msg.sender, _to, _value);
		// the return value is call success
		return true; 
	}
	
}