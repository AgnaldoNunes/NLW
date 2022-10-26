import { SafeAreaView, TouchableOpacity, View, Image, FlatList, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native'
import {Entypo} from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../Components/Background';


import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../Components/Background/Heading';
import {DuoMatch} from '../../Components/DuoMatch'
import { DuoCard, DuoCardProps } from '../../Components/Background/DuoCard';
import { useEffect, useState } from 'react';


export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
 
  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`https://86a9-179-225-239-148.sa.ngrok.io/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`https://86a9-179-225-239-148.sa.ngrok.io/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  }, []);


  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <View style = {styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo
            name = "chevron-thin-left"
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />
        </TouchableOpacity>
        <Image 
        source={logoImg}
        style={styles.logo} 
        />

        <View style = {styles.right}/>
      </View>

      <Image
      source = {{uri: game.banner}}
      style={styles.cover}    
      resizeMode="cover"  
      />

      <Heading
      title={game.title}
      subtitle="Conecte-se e comece a jogar!"
      />

        
      <FlatList 
      data={duos}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <DuoCard data = {item} 
        onConnect = {() => getDiscordUser(item.id)}
        />
      )}
      horizontal
      style={styles.containerList}
      contentContainerStyle={[duos.length > 0 ?  styles.contentList : styles.emptyListContent]}
      showsHorizontalScrollIndicator={false}      
      ListEmptyComponent = {() => (
        <Text style={styles.emptyListText}>
          Não há anúncios publicados ainda.
        </Text>
      )}
      
      />
      <DuoMatch
        visible={discordDuoSelected.length > 0}
        discord= {discordDuoSelected}
        onClose={() => setDiscordDuoSelected('')}
      />
    </SafeAreaView>
    </Background>
  );
}