module.exports = {
    name: 'flip',
    aliases: ['bet'],
    permissions: [],
    cooldown: 5,
    description: "Flip a coin for double or nothing!",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 2) {
            return message.channel.send(`Error: You must bet some money and predict the result to do the flip!`);
        }

        let amount = args[0];
        
        try {
            amount = parseInt(args[0]);
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: ${args[0]} is not a positive integer`);
        }

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || args[0] % 1 != 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if(!profileData) {
            return message.channel.send('Error: Cannot locate your account. Please try again');
        }

        if(0 > profileData.coins - amount) {
            return message.channel.send(`Error: You do not have ${amount} coins to bet!`);
        }

        let bet = args[1].toLowerCase();

        if(!["heads", "h", "tails", "t"].includes(bet)) {
            return message.channel.send(`Error: ${args[1]} is not a valid bet.\nValid bets are: "Heads", "Tails", "H", and "T".`);
        }

        let rng = Math.floor(Math.random() * 4); //[0, 3]
        if(rng % 2 == 1) {
            rng = "heads";
        } else {
            rng = "tails";
        }

        if(rng.charAt(0) == bet.charAt(0)) {
            try {
                profileData.coins += amount;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Could not complete the coin toss`);
            }
            return message.channel.send(`Success! You bet ${bet} and the coin landed ${rng} up.\nYou just gained ${amount} coins, your wallet now contains ${profileData.coins} coins.`);
        } else {
            try {
                profileData.coins -= amount;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Could not complete the coin toss`);
            }
            return message.channel.send(`Bad luck... You bet ${bet} and the coin landed ${rng} up.\nYou just lost ${amount} coins, your wallet now contains ${profileData.coins} coins.`);
        }
    }
}