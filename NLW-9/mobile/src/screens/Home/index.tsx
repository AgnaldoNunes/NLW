import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'


import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../Components/Background/GameCard';

import { Heading } from '../../Components/Background/Heading';

import { styles } from './styles';
import {useNavigation} from '@react-navigation/native'
import { Background } from '../../Components/Background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, banner}: GameCardProps) {
    navigation.navigate('game', {id, title, banner});
  }


  useEffect(() => {
    fetch('https://0c72-179-225-239-170.sa.ngrok.io/games')
    .then(response => response.json())
    .then(data => setGames(data));
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image
      source = {logoImg} 
      style = {styles.logo}
      />

      <Heading 
        title = "Encontre seu duo!"
        subtitle='Selecione o game que deseja jogar...'      
      />

        <FlatList
      data = {games}
      keyExtractor={item => item.id}
      renderItem={({item}) =>  (
        <GameCard
        data = {item}  
        onPress={() => handleOpenGame(item)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle = {styles.contentList}
      />


    </SafeAreaView>
    </Background>
  );
}