const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, entersState, StreamType } = require('@discordjs/voice');
const fs = require('fs');
const { FFmpeg } = require('prism-media');
const sodium = require('libsodium-wrappers');

sodium.ready.then(() => {
  const message = 'Hello, world!';
  const key = sodium.crypto_secretbox_keygen();
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  const encryptedMessage = sodium.crypto_secretbox_easy(message, nonce, key);
  console.log('Encrypted:', encryptedMessage);

  const decryptedMessage = sodium.crypto_secretbox_open_easy(encryptedMessage, nonce, key);
  console.log('Decrypted:', decryptedMessage.toString());
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});


const ffmpegPath = '/usr/bin/ffmpeg'; 


const TOKEN = process.env.token;

const PREFIX = '!';


const voiceConnections = new Map();


const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity({
    name: 'ASMR',
    type: ActivityType.Playing,
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(`${PREFIX}join`)) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply('You need to be in a voice channel to use this command.');
      return;
    }

  
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      ffmpegArgs: ['-loglevel', 'quiet', '-probesize', '32', '-analyzeduration', '0'], 
      ffmpegPath: ffmpegPath, 
    });

    voiceConnections.set(voiceChannel.guild.id, connection);

    message.reply(`Joined ${voiceChannel.name}`);
  }

  if (message.content.startsWith(`${PREFIX}leave`)) {
    async function disconnect() {
      const voiceConnection = voiceConnections.get(message.guild.id);

      if (!voiceConnection) {
        message.reply('I am not in a voice channel.');
        return;
      }


      if (voiceConnection.state.status === VoiceConnectionStatus.Playing) {
        voiceConnection.state.audioPlayer.stop();
      }

      try {
        const movedState = await Promise.race([
          entersState(voiceConnection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000),
        ]);

        if (movedState) {
          message.reply('Moving to another voice channel.');
        } else {
          voiceConnection.destroy();
          voiceConnections.delete(message.guild.id);
          message.reply('Left the voice channel.');
        }
      } catch (error) {
        console.error('Error while leaving voice channel:', error);
        message.reply('An error occurred while leaving the voice channel.');
      }
    }

    await disconnect();
  }

  if (message.content.startsWith(`${PREFIX}asmr`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }


    const filePath = './media/asmr_hina.mp3'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }

   
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
      encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
    });

  
    voiceConnection.subscribe(player);

    
    player.play(resource);

    message.reply('Playing ASMR.');
  }

 if (message.content.startsWith(`${PREFIX}sparkle`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }

    const filePath = './media/sparkle.mp3';
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }


    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });

   
    voiceConnection.subscribe(player);

  
    player.play(resource);

    message.reply('Playing スパークル.');
  }


 if (message.content.startsWith(`${PREFIX}Idol`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }

   
    const filePath = './media/01. アイドル.mp3'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }

    
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });

  
    voiceConnection.subscribe(player);

    
    player.play(resource);

    message.reply('Playing アイドル.');
  }

  if (message.content.startsWith(`${PREFIX}wildfire`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }


    const filePath = './media/wildfire.mp3'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }


    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });


    voiceConnection.subscribe(player);


    player.play(resource);

    message.reply('Playing Wildfire.');
  }
  
 if (message.content.startsWith(`${PREFIX}stellar`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }

   
    const filePath = './media/01. Stellar Stellar.mp3'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }

    
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });

  
    voiceConnection.subscribe(player);

    
    player.play(resource);

    message.reply('Playing Stellar Stellar.');
  }

   if (message.content.startsWith(`${PREFIX}loneliness, guitar, blue planet`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }

   
    const filePath = './media/01 結束バンド - ギターと孤独と蒼い惑星.flac'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }

    
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });

  
    voiceConnection.subscribe(player);

    
    player.play(resource);

    message.reply('Playing 結束バンド - ギターと孤独と蒼い惑星.');
  }
  
  if (message.content.startsWith(`${PREFIX}homura`)) {
    const voiceConnection = voiceConnections.get(message.guild.id);
    if (!voiceConnection) {
      message.reply('I need to be in a voice channel. Use `!join` first.');
      return;
    }

   
    const filePath = './media/48.炎 -MOVIE ver.-.mp3'; 
    if (!fs.existsSync(filePath)) {
      message.reply('The local audio file does not exist.');
      return;
    }

    
    const player = createAudioPlayer();
    const resource = createAudioResource(filePath, {
      inputType: StreamType.Arbitrary,
    });

  
    voiceConnection.subscribe(player);

    
    player.play(resource);

    message.reply('Playing 炎 -MOVIE ver');
  }


});



client.login(process.env['token']);
