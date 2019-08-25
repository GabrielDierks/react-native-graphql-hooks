import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Colors from './Colors';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Button,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_GAMES = gql`
  {
    rates(currency: "USD") {
      currency
      name
    }
  }
`;

const Main = () => {
  const {loading, error, data, refetch} = useQuery(GET_GAMES);

  let [showScore, toggleScore] = useState(true);
  let [showSnackbar, toggleSnackbar] = useState(true);
  let [gameScore, toggleGameScore] = useState(null);

  const handleScore = item => {
    toggleScore();
    toggleGameScore(item);
  };
  return showScore ? (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <FlatList
            data={data.rates}
            style={styles.gameList}
            refreshing={loading}
            keyExtractor={item => item.currency}
            onRefresh={() => refetch()}
            renderItem={({item}) => (
              <Card
                onPress={() => handleScore(item)}
                key={item.currency}
                style={styles.card}>
                <Card.Content>
                  <Title>{item.name}</Title>
                  <Paragraph style={styles.paragraph}>
                    {item.currency}
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
      <FAB
        style={styles.fab}
        big
        color="white"
        icon="add"
        onPress={() => console.log('press')}
      />
      {error && (
        <Snackbar
          visible={showSnackbar}
          duration={7000}
          onDismiss={() => toggleSnackbar()}
          action={{
            label: 'close',
            onPress: () => toggleSnackbar(),
          }}>
          {error.message}
        </Snackbar>
      )}
    </>
  ) : (
    <View>
      <Paragraph style={styles.paragraph}>{gameScore.name}</Paragraph>
      <Paragraph style={styles.paragraph}>{gameScore.currency}</Paragraph>
      <Button onPress={() => toggleScore(!showScore)}>back</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: Colors.grey,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameList: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  card: {
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  paragraph: {
    fontSize: 32,
    height: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Main;
