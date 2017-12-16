import React from 'react'
import { Container, Header, Content, Body, Title } from 'native-base'

interface Props {
  title: string,
  children: any
}

export const BaseContainer = ({title, children}: Props) => {
  return (
  <Container>
    <Header >
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
    <Content>
      {children}
    </Content>
  </Container >
)}
