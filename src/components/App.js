import React, { Component } from 'react';
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import "./App.css";
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);


class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true,
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brands {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      this.setState({ brands: response.data.brands, loadingBrands: false });
    } catch(err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  onChange = ({ value }) => {
    this.setState({ searchTerm: value });
  }

  filteredBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand => {
      return brand.name.toLowerCase().includes(searchTerm)
        || brand.description.toLowerCase().includes(searchTerm);
    });
  }

  render() {
    const { searchTerm, loadingBrands } = this.state;
    return (
      <Container>
        {/* Brands Search Field */}
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
          <SearchField 
            id="SearchField"
            onChange={this.onChange}
            accessibilityLabel="Brands Search Field"
            placeholder="Search Brands"
            value={searchTerm}
          />
          <Box margin={3}>
            <Icon
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
        {/* Brands Section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box 
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#d6c8ec'
            }
          }}
          shape="rounded"
          wrap display="flex" justifyContent="around"
        >
          {this.filteredBrands(this.state).map(brand => (
            <Box 
              key={brand._id}
              width={200}
              margin={2}
              paddingY={4}
            >
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image 
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}/>
                  </Box>
                }
              >
                <Box 
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Text bold size="xl">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        <Loader show={loadingBrands} accessibilityLabel="Loader Brands" />
      </Container>
    );
  }
}

export default App;
