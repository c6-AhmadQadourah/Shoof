import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../config';
import { API_KEY,BASE_URL } from '../config';
import Constants from '../Constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);


  const navigation =useNavigation()
  useEffect(() => {
    const getMovies = async () => {

axios
  .get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`)
  .then((res) => {
    setMovies(res.data.results)
     const images = res.data.results.map(
       (data) => `${IMAGE_POSTER_URL}${data.backdrop_path}`
     );
     let backImages = [];
     for (let i = 0; i < 10; ++i) {
       backImages = [...backImages, images[i]];
     }
     setImages(backImages);
  })
  .catch((err)=>console.log('err', err))
    };

    getMovies();
  }, []);

  return (
    <View>
      <SliderBox
        images={images}
        dotColor={Constants.secondaryColor}
        onCurrentImagePressed={index =>
          navigation.navigate('movieDetails', {movieId: movies[index].id})
        }
      />
    </View>
  );
};

export default DiscoverMovies;
