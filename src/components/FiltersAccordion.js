//Utilities
import React, { useState, useEffect } from 'react'

//Library components
import { List, Card } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'

//Own components

//Actions and functions

const FiltersAccordion = ({
    expandedFilters,
    setExpandedFilters,
    filtros,
    setFiltros,
    cleanFiltros,
    supermercados
}) => {

    const [supermercado, setSupermercado] = useState(filtros.supermercado !== '' ? filtros.supermercado : null)
    const [supermercadosDropdown, setSupermercadosDropdrown] = useState([])
    const [expandedDropdown, setExpandedDropdown] = useState(false)

    useEffect(() => {
        var supermercadosAux = []
        supermercados.map(s => {
            supermercadosAux.push({label: s.nombre, value: s.nombre})
        })
        setSupermercadosDropdrown(supermercadosAux)
    }, [supermercados])

    useEffect(() => {
        setSupermercado(filtros.supermercado !== '' ? filtros.supermercado : null)
    }, [filtros])

    return (
        <Card style={styles.card}>
            <List.Section>
                <List.Accordion 
                    title="Filtros"
                    left={() => <Icon name='filter' type='font-awesome'/>}
                    expanded={expandedFilters}
                    onPress={() => setExpandedFilters(!expandedFilters)}
                >
                    <View style={expandedDropdown ? styles.dropdownRowExpanded : styles.dropdownRowCompact}>
                        <DropDownPicker 
                            items={supermercadosDropdown}
                            placeholder="Selecciona un supermercado"
                            onChangeItem={item => {
                                setSupermercado(item.value)
                                setFiltros({
                                    ...filtros,
                                    supermercado: item.value
                                })
                            }}
                            containerStyle={styles.dropdownContainer}
                            dropDownStyle={styles.dropdown}
                            defaultValue={supermercado}
                            onOpen={() => setExpandedDropdown(true)}
                            onClose={() => setExpandedDropdown(false)}
                        />
                        {supermercado !== null && 
                            <Icon name='delete' type='feather' color='#e06565' style={styles.icon} onPress={() => cleanFiltros()}/>
                        }
                    </View>
                </List.Accordion>
            </List.Section>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 25,
        maxWidth: 700
    },
    dropdownRowExpanded:{
        minHeight: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    dropdownRowCompact:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    dropdownContainer: {
        width: 300,
        height: 40
    },
    dropdown: {
        width: 300
    },
    icon: {
        marginLeft: 10,
        top: 7
    }
})

export default FiltersAccordion