#@AronAyub 2024

def convert_sensor_data(hex_data):

    # Extract temperature and voltage readings from hex data
    temp_keys = ['TEMP1', 'TEMP2', 'TEMP3', 'TEMP4']
    temp_values = [(int(hex_data[i:i+4], 16) - 10000) / 100 for i in range(0, 16, 4)]

    volt = int(hex_data[16:20], 16) / 1000
 
    return dict(zip(temp_keys, temp_values), VOLT=volt)