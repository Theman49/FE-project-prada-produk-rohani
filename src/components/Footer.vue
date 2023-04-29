<script>
</script>

<template>
    <div class="px-[1em] sm:container flex flex-col gap-5 sm:flex sm:justify-between sm:flex-row sm:gap-4 pb-4">
        <div class="footer-item">
            <div>
                <p class="heading">Tentang Kami</p>
            </div>
            <div>
                <p>Prada Produk Rohani</p>
                <p>Menyediakan souvenir-hadiah-hampers produk rohani untuk kebutuhan pribadi dan gereja</p>
            </div>
        </div>
        <div class="footer-item">
            <div>
                <p class="heading">Alamat</p>
            </div>
            <div>
                <p>Jl. Taman Alfa Indah Blok J1 No.18, RT.1/RW.7, Petukangan Utara, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12260, Indonesia</p>
            </div>
        </div>
        <div class="footer-item">
            <div>
                <p class="heading">Hubungi Kami</p>
            </div>
            <div :style="{
                'display': 'flex',
                'flex-direction': 'column',
            }">
                <a href="https://instagram.com/souvenirhadiahrohani" target="blank">
                    <div :style="{
                        'display': 'flex',
                        'align-items': 'center',
                        'gap': '5px'
                    }">
                            <v-icon name="co-instagram" scale="1.25"/>
                            <!-- <CoInstagram /> -->
                        <p>Instagram</p>
                    </div>
                </a>
                <a href="https://wa.me/6281318453393" target="blank">
                    <div :style="{
                        'display': 'flex',
                        'align-items': 'center',
                        'gap': '5px'
                    }">
                            <v-icon name="co-whatsapp" scale="1.25"/>
                            <!-- <CoInstagram /> -->
                        <p>WhatsApp</p>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="footer-item">
            <div>
                <p class="heading">Jam Operasional</p>
            </div>
            <div>
                <p>08.00 - 17.00</p>
                <p>Senin - Minggu</p>
            </div>
        </div>
    </div>
</template>

<style>
    .footer-item {
        width: 100%;
        height: 200px;
        /* background-color: #999; */
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    @media screen and (max-width: 578px){
        .footer-item {
            height: auto;
        }
    }
    .footer-item .heading {
        font-size: 16px;
        font-weight: bold;
    }
</style>
