 const tariffRates = {
            'EU': { 
                'Tech': 0.07, 
                'Metals': 0.08, 
                'Automobiles': 0.10, 
                'Other': 0.05 
            },
            'China': { 
                'Tech': 0.08, 
                'Metals': 0.10, 
                'Automobiles': 0.12, 
                'Other': 0.06 
            },
            'Canada': { 
                'Tech': 0.06, 
                'Metals': 0.07, 
                'Automobiles': 0.09, 
                'Other': 0.04 
            },
            'Japan': { 
                'Tech': 0.04, 
                'Metals': 0.06, 
                'Automobiles': 0.08, 
                'Other': 0.03 
            },
            'India': { 
                'Tech': 0.10, 
                'Metals': 0.12, 
                'Automobiles': 0.15, 
                'Other': 0.08 
            },
            'Other': { 
                'Tech': 0.12, 
                'Metals': 0.15, 
                'Automobiles': 0.14, 
                'Other': 0.10 
            }
        };

        document.getElementById('tariffForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const priceWithTariff = parseFloat(document.getElementById('price').value);
            const country = document.getElementById('country').value;
            const itemType = document.getElementById('itemType').value;
            const resultDiv = document.getElementById('result');

            if (isNaN(priceWithTariff) || priceWithTariff <= 0) {
                resultDiv.textContent = 'Please enter a valid price.';
                resultDiv.style.display = 'block';
                return;
            }

            if (!country || !itemType) {
                resultDiv.textContent = 'Please select both a country and item type.';
                resultDiv.style.display = 'block';
                return;
            }

            const tariffRate = tariffRates[country]?.[itemType] || 0.10;
            const originalPrice = priceWithTariff / (1 + tariffRate);
            const tariffAmount = priceWithTariff - originalPrice;

            resultDiv.textContent = `Original Price (before tariff): $${originalPrice.toFixed(2)}\n` +
                                   `Tariff Amount: $${tariffAmount.toFixed(2)} (${(tariffRate * 100).toFixed(0)}%)`;
            resultDiv.style.display = 'block';
        });