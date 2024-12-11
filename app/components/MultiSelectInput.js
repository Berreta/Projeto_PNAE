import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Checkbox, List } from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      {/* Accordion com sobreposição */}
      <List.Accordion
        title={displayText}
        id="1"
        style={styles.accordion}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)} // Alterna o estado de expansão
      >
        {/* Lista de itens, com estilo para sobrepor os outros conteúdos */}
        <View style={[styles.dropdown, expanded && { zIndex: 10 }]}>
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
        </View>
      </List.Accordion>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    backgroundColor: '#fff',
  },
  accordion: {
    //marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Ajuste conforme a altura do Accordion
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

});

export default MultiSelectInput;
