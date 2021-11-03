import React, { useState } from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, onClose, onChange }) {
    const [dateNow, setDateNow] = useState(new Date(date));
    return (
        <TouchableOpacity style={{
            backgroundColor: "#0006",
            position: 'absolute',
            justifyContent: "flex-end",
            width: '100%',
            height: '100%'
        }}>
            {Platform.OS === 'ios' && (
                <View style={{
                    width: '100%',
                    padding: 16,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    backgroundColor: '#fff',
                    borderBottomWidth: 1,
                    borderColor: 'grey',
                }}>
                    <TouchableOpacity onPress={onClose}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <DateTimePicker
                value={dateNow}
                mode='date'
                display='default'
                onChange={(e, d) => {
                    const currenteDate = d || dateNow;
                    setDateNow(currenteDate);
                    onChange(currenteDate);
                }}
                style={{ backgroundColor: '#fff' }}
            >

            </DateTimePicker>
        </TouchableOpacity>
    )
}
