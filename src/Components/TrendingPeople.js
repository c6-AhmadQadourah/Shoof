import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import {IMAGE_POSTER_URL} from '../config';
import { API_KEY,BASE_URL } from '../config';
import Styles from '../Styles';
import Loader from './Loader';
import axios from 'axios';

const TrendingPeople = ({ url, isForPage ,title}) => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState();

  useEffect(() => {
    const getPeople = async () => {
      axios
        .get(`${BASE_URL}/${url}?api_key=${API_KEY}`)
        .then((res) => {
          setPeople(
            isForPage === "details" ? res.data.cast : res.data.results
          );
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getPeople();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={Styles.heading}>{title}</Text>
          <FlatList
            keyExtractor={(item) => item.id}
            data={people}
            renderItem={displayPeople}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

const displayPeople = ({item}) => {
  return (
    <View style={Styles.trendingPeopleContainer}>
      <Image
        source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
        style={Styles.trendingPeopleImage}
      />
      <Text style={Styles.trendingPeopleName}>{item.name}</Text>
    </View>
  );
};

export default TrendingPeople;
