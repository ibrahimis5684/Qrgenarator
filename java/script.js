var qrimg = document.getElementById("qrimg");
        var downloadBtn = document.getElementById("download");
        var loadingMessage = document.getElementById("loading-message");

        async function generateQR() {
            var text = document.getElementById("input").value;
            if (text !== '') {
                loadingMessage.style.display = "block";
                try {
                    var response = await fetch('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text));
                    if (response.ok) {
                        var qrCodeImageSrc = URL.createObjectURL(await response.blob());
                        qrimg.innerHTML = '<img src="' + qrCodeImageSrc + '">';
                        downloadBtn.style.display = "block";
                        downloadBtn.href = qrCodeImageSrc;
                    } else {
                        showAlert("Error generating QR");
                    }
                } catch (error) {
                    showAlert("Fetching failed");
                    console.log(error);
                }
                loadingMessage.style.display = "none";
            } else {
                showAlert("Enter valid text");
            }
        }

        function showAlert(message) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message
            });
        }
       