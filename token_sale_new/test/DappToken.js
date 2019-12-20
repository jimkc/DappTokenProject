const DappToken = artifacts.require('./DappToken.sol');

contract('DappToken', function(accounts){
	var tokenInstance;

	it('initializes the contract with the correct values', function(){
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'DApp Token', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'DAPP', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'DApp Token V1.0', 'has correct standard')
		});
	})

	it('sets the total supply upon development', function(){
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 1000000, 
				'it allocates the initial supply to the admini account');
		});
	});

	it('transfers token ownership', function(){
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance;
			// Test 'require' statement first by transfering something larger than the sender's balance
			// Don't test with a number larger than the computer can read
			return tokenInstance.transfer.call(accounts[1], 9999999999999); 
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
		}).then(function(success){
			assert.equal(success, true, 'it returns true');
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transfered from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transfered to');
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, 'adds the coins to the recieving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
		});
	})
})









