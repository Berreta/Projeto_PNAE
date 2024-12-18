import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Checkbox, List } from 'react-native-paper';

const MultiSelectInput = ({ label, items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayText, setDisplayText] = useState(label); // Texto exibido no botão Accordion
  const [expanded, setExpanded] = useState(false); // Controla se a lista está expandida

  // Função para adicionar ou remover itens da lista de selecionados
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      const updatedSelected = prevSelected.includes(item)
        ? prevSelected.filter(i => i !== item) // Remove item
        : [...prevSelected, item]; // Adiciona item

      // Atualiza o displayText com os itens selecionados
      setDisplayText(updatedSelected.length > 0 ? updatedSelected.join(' ') : label);
      return updatedSelected;
    });
  };

  // Função para fechar o Accordion quando pressionar fora da área
  const handlePressOutside = () => {
    if (expanded) {
      setExpanded(false);  // Fecha o Accordion se ele estiver aberto
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={handlePressOutside}>
    <View style={styles.container}>
      {/* Accordion com sobreposição */}
      <List.Accordion
        title={displayText}
        id="1"
        style={styles.accordion}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)} // Alterna o estado de expansão
      >
        {/* Lista de itens, agora com rolagem */}
        <View style={[styles.dropdown, expanded && { zIndex: 10 }]}>
          {expanded && (
            <ScrollView style={styles.scrollView}>  {/* ScrollView para rolagem */}
              {items.map(item => (
                <List.Item
                  key={item}
                  title={item}
                  left={() => (
                    <Checkbox
                      status={selectedItems.includes(item) ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange(item)}
                    />
                  )}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </List.Accordion>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accordion: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 50, 
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight:200
  },
  scrollView: {
    maxHeight: 200, 
  },
});

export default MultiSelectInput;
