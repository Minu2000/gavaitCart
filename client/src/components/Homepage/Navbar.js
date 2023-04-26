import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./Assets/logo.png"; // import your logo image
import axios from "axios";
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 110px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;



const Input = styled.input`
  border: none;
  margin-left: 5px;
`;

const Center = styled.div`
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin-right: 10px;
  display: inline;
`;

const LogoImage = styled.img`
  height: 150px;
  width:170px;
  margin-top: -30px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  background-color: transparent;
  border: none;
`;

const Navbar = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/Navbar")
      .then((response) => {
        if (response.status === 200) {
          console.log("Navbar fetched successfully", response.data);
        } else {
          throw new Error(
            "Failed to fetch Navbar. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching Navbar:", error);
        setError(error.message);
      });
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <LogoImage src={logo} alt="Logo" />
          </Left> 
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;