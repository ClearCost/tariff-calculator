function calculateTariff() {
    const importValue = parseFloat(document.getElementById('importValue').value);
    const country = document.getElementById('country').value;
    const tariffCategory = document.getElementById('tariffCategory').value;
    const importDate = new Date(document.getElementById('importDate').value);
    const resultDiv = document.getElementById('result');
    let tariffRate = 0;
    let additionalDuty = 0;
    let tariffCost = 0;

    if (isNaN(importValue) || importValue < 0) {
        resultDiv.innerText = 'Please enter a valid import value.';
        return;
    }

    switch (country) {
        case 'china':
            if (tariffCategory === 'general') {
                tariffRate = 1.45; 
            } else if (tariffCategory === 'deMinimis') {
                if (importValue >= 800) {
                    resultDiv.innerText = 'Low-value tariff applies only to packages under $800.';
                    return;
                }
                tariffRate = 0.90; 
                const may2_2025 = new Date('2025-05-02');
                const jun1_2025 = new Date('2025-06-01');
                if (importDate >= may2_2025 && importDate < jun1_2025) {
                    additionalDuty = 75; 
                } else if (importDate >= jun1_2025) {
                    additionalDuty = 150; 
                } else {
                    resultDiv.innerText = 'De minimis tariffs for China start May 2, 2025.';
                    return;
                }
            } else if (tariffCategory === 'steelAluminum') {
                tariffRate = 0.25; 
            } else if (tariffCategory === 'techExempt') {
                tariffRate = 0.20; 
            }
            break;
        case 'canada':
        case 'mexico':
            if (tariffCategory === 'general') {
                tariffRate = 0.25; 
            } else if (tariffCategory === 'deMinimis') {
                tariffRate = 0.10; 
            } else if (tariffCategory === 'steelAluminum') {
                tariffRate = 0.25; 
            } else if (tariffCategory === 'techExempt') {
                tariffRate = 0.10; 
            }
            if (tariffCategory === 'general' || tariffCategory === 'deMinimis') {
                resultDiv.innerHTML += '<br>Note: USMCA-qualifying goods may be exempt. Verify eligibility.';
            }
            break;
        case 'eu':
            if (tariffCategory === 'general') {
                tariffRate = 0.20; 
            } else if (tariffCategory === 'deMinimis') {
                tariffRate = 0.10; 
            } else if (tariffCategory === 'steelAluminum') {
                tariffRate = 0.25; 
            } else if (tariffCategory === 'techExempt') {
                tariffRate = 0.10; 
            }
            break;
        case 'japan':
        case 'southKorea':
        case 'uk':
        case 'other':
            if (tariffCategory === 'general') {
                tariffRate = 0.10; 
            } else if (tariffCategory === 'deMinimis') {
                tariffRate = 0.10; 
            } else if (tariffCategory === 'steelAluminum') {
                tariffRate = 0.25; 
            } else if (tariffCategory === 'techExempt') {
                tariffRate = 0.10; 
            }
            break;
        default:
            tariffRate = 0.10; 
    }

    tariffCost = (importValue * tariffRate) + additionalDuty;
    tariffCost = tariffCost.toFixed(2);
    const totalCost = (parseFloat(importValue) + parseFloat(tariffCost)).toFixed(2);

    resultDiv.innerHTML = `Tariff Cost: $${tariffCost}<br>Total Cost (Goods + Tariff): $${totalCost}`;
    if (additionalDuty > 0) {
        resultDiv.innerHTML += `<br>Includes $${additionalDuty} per-item duty for low-value packages from China.`;
    }
}