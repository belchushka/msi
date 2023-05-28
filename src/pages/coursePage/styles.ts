import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    top_image: {
        flex: 3,
        backgroundColor: 'black'
    },
    swiper: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#00000033'
    },
    base_info: {
        flex: 6,
        padding: 20
    },
    text_header: {
        fontSize: 28,
        color: 'black',
        marginVertical: 20
    },
    text_subheader: {
        fontSize: 24,
        color: 'black',
        marginVertical: 20
    },
    text: {
        fontSize: 18,
        color: '#76787A'
    },
    tag_container: {
        borderColor: "#A4CE57",
        borderRadius: 8,
        borderWidth: 3,
        padding: 8,
        alignSelf: 'flex-start',
    },
    tag_text: {
        fontSize: 16,
        color: "#A4CE57"
    },
    tag_row: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },

    option_text: {
        fontSize: 20
    },
    
    selected_option_text: {
        color: '#A4CE57',
    },

    deselected_option_text: {
        color: 'black',
    },

    options_background: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    selected_background: {
        borderBottomColor: '#A4CE57',
        borderBottomWidth: 3,
    }
      
  
});
