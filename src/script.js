 const tariffRates = {
            'EU': { 
                'Tech': 0.3, 
                'Metals': 0.10, 
                'Automobiles': 0.10, 
                'Other': 0.10 
            },
            'China': { 
                'Tech': 0.10, 
                'Metals': 0.20, 
                'Automobiles': 0.20, 
                'Other': 0.15 
            },
            'Canada': { 
                'Tech': 0.3, 
                'Metals': 0.5, 
                'Automobiles': 0.7, 
                'Other': 0.10 
            },
            'Japan': { 
                'Tech': 0.3, 
                'Metals': 0.5, 
                'Automobiles': 0.1, 
                'Other': 0.5 
            },
            'India': { 
                'Tech': 0.15, 
                'Metals': 0.10, 
                'Automobiles': 0.80, 
                'Other': 0.25 
            },
            'Other': { 
                'Tech': 0.4, 
                'Metals': 0.12, 
                'Automobiles': 0.18, 
                'Other': 0.15
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