// alternate tracker html, default tracker is in index.html, so this version is a more compact layout
var altTracker = `<table width="100%">
<tr style="height: 4em;">
    <td style="text-align: left; width: 60%;">
        <h1 id="main-tracker-name">Required Items</h1>
    </td>
    <td style="text-align: right;">
        <h2></h2>
    </td>
</tr>
</table>
<div style="display:flex;flex-wrap:wrap;padding-left:10px;">
    <div class="compact-element"><img data-chapter-star="1" id="Eldstar" class="unselected star-spirit" src="images/icons/Eldstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="2" id="Mamar" class="unselected star-spirit" src="images/icons/Mamar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="3" id="Skolar" class="unselected star-spirit" src="images/icons/Skolar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="4" id="Muskular" class="unselected star-spirit" src="images/icons/Muskular_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="5" id="Misstar" class="unselected star-spirit" src="images/icons/Misstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="6" id="Klevar" class="unselected star-spirit" src="images/icons/Klevar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="7" id="Kalmar" class="unselected star-spirit" src="images/icons/Kalmar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="8" id="Star Rod" class="unselected star-spirit" src="images/icons/PM_Starrod.png"></div>
    <div class="compact-element"><img id="Goombario" class="unselected partner" src="images/partners/goombario.png"></div>
    <div class="compact-element"><img id="Kooper" class="unselected partner" src="images/partners/kooper.png"></div>
    <div class="compact-element"><img id="Bombette" class="unselected partner" src="images/partners/bombette.png"></div>
    <div class="compact-element"><img id="Parakarry" class="unselected partner" src="images/partners/parakarr.png"></div>
    <div class="compact-element"><img id="Bow" class="unselected partner" src="images/partners/bow.png"></div>
    <div class="compact-element"><img id="Watt" class="unselected partner" src="images/partners/watt.png"></div>
    <div class="compact-element"><img id="Sushie" class="unselected partner" src="images/partners/sushie.png"></div>
    <div class="compact-element"><img id="Lakilester" class="unselected partner" src="images/partners/lakilester.png"></div>
    <div class="compact-element"><img id="Boots" class="boots upgrade" src="images/upgrades/PM_Normal_Boots_Sprite.png"></div>
    <div class="compact-element"><img id="Hammer" class="hammer upgrade" src="images/upgrades/PM_Normal_Hammer_Sprite.png"></div>
    <div class="compact-element"><img id="Ultra Stone" class="unselected optional-item" src="images/icons/UltraStone.gif"></div>
    <div class="compact-misc-item compact-element"><img id="Dolly" class="unselected optional-item" src="images/icons/PeachDoll_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Kooper's Shell" class="unselected optional-item" src="images/icons/Kooper'sShell_PM.png"></div>
    <div class="compact-element">
        <img data-chapter-key="1" id="Fortress Key" class="unselected key-item" src="images/icons/FortressKey_PM.png">
        <br>
        <p data-chapter-key-count="1">0/4</p>
    </div>
    <div class="compact-element"><img data-chapter="2" id="Pulse Stone" class="unselected key-item" src="images/icons/PulseStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Pyramid Stone" class="unselected key-item" src="images/icons/PyramidStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Diamond Stone" class="unselected key-item" src="images/icons/DiamondStone.png"></div>
    <div class="compact-element"><img data-chapter="2" id="Lunar Stone" class="unselected key-item" src="images/icons/LunarStone.gif"></div>
    <div class="compact-element">
        <img data-chapter-key="2" id="Ruins Key" class="unselected key-item" src="images/icons/Ruins_Key.png">
        <br>
        <p data-chapter-key-count="2">0/4</p>
    </div>
    <div class="compact-misc-item compact-element"><img id="Artifact" class="unselected optional-item" src="images/icons/Artifact_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Record" class="unselected optional-item" src="images/icons/Record.gif"></div>
    <div class="compact-misc-item compact-element"><img id="Weight" class="unselected optional-item" src="images/icons/WeightPM.gif"></div>
    <div class="compact-element"><img data-chapter="3" id="Boo's Portrait" class="unselected key-item" src="images/icons/Boo'sPortrait_PM.png"></div>
    <div class="compact-element">
        <img data-chapter-key="3" id="Tubba Castle Key" class="unselected key-item" src="images/icons/Tubba_Blubba_Castle_Key.png">
        <br>
        <p data-chapter-key-count="3">0/3</p>
    </div>
    <div class="compact-misc-item compact-element">
        <img id="Storeroom Key" class="unselected optional-item" src="images/icons/OddKey.gif">
        <div class="colorblind-label">S</div>
    </div>
    <div class="compact-element"><img data-chapter="4" id="Toy Train" class="unselected key-item" src="images/icons/ToyTrain_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Calculator" class="unselected optional-item" src="images/icons/Calculator_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Frying Pan" class="unselected optional-item" src="images/icons/PM_Frying_Pan.png"></div>
    <div class="compact-misc-item compact-element"><img id="Mailbag" class="unselected optional-item" src="images/icons/Mailbag_PM.png"></div>
    <div class="compact-element"><img data-chapter="4" id="Cake" class="unselected key-item" src="images/icons/Cake.gif"></div>
    <div class="compact-misc-item compact-element useless-item"><img id="Cookbook" class="unselected optional-item" src="images/icons/Cook_Book_Paper_Mario.png"></div>
    <div class="compact-misc-item compact-element"><img id="Dictionary" class="unselected optional-item" src="images/icons/PM_Dictionary.png"></div>
    <div class="compact-misc-item compact-element useless-item"><img id="Mystery Note" class="unselected optional-item" src="images/icons/MysteryNote.png"></div>
    <div class="compact-element"><img data-chapter="5" id="Jade Raven" class="unselected key-item" src="images/icons/JadeRaven_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Volcano Vase" class="unselected optional-item" src="images/icons/VolcanoVase.gif"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 1" class="unselected key-item" src="images/icons/MagicalSeed1.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 2" class="unselected key-item" src="images/icons/MagicalSeed2.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 3" class="unselected key-item" src="images/icons/MagicalSeed3.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 4" class="unselected key-item" src="images/icons/MagicalSeed4.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Magical Bean" class="unselected key-item" src="images/icons/MagicBean_PM.png"></div>
    <div class="compact-misc-item compact-element">
        <img id="Red Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_RedBerry.png">
        <div class="colorblind-label">R</div>
    </div>
    <div class="compact-misc-item compact-element">
        <img id="Yellow Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_YellowBerry.png">
        <div class="colorblind-label">Y</div>
    </div>
    <div class="compact-misc-item compact-element">
        <img id="Blue Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_BlueBerry.png">
        <div class="colorblind-label">B</div>
    </div>
    <div class="compact-element"><img data-chapter="6" id="Fertile Soil" class="unselected key-item" src="images/icons/Fertilesoil.png"></div>
    <div class="compact-misc-item compact-element"><img id="Crystal Berry" class="unselected optional-item" src="images/icons/CrystalBerry_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Water Stone" class="unselected optional-item" src="images/icons/WaterStone_PM.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Miracle Water" class="unselected key-item" src="images/icons/MiracleWater_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Bubble Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_BubbleBerry.png"></div>
    <div class="compact-misc-item compact-element blue-house-optional">
        <img data-item-name="Odd Key" id="Odd Key" class="unselected optional-item" src="images/icons/OddKey.gif">
        <div class="colorblind-label">O</div>
    </div>
    <div class="compact-element">
        <img data-chapter="7" id="Warehouse Key" class="unselected key-item" src="images/icons/OddKey.gif">
        <div class="colorblind-label">W</div>
    </div>
    <div class="compact-element"><img data-chapter="7" id="Scarf" class="unselected key-item" src="images/icons/Scarf.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Bucket" class="unselected key-item" src="images/icons/Bucket.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Star Stone" class="unselected key-item" src="images/icons/StarStone_PM.png"></div>
    <div class="compact-misc-item compact-element useless-item">
        <img id="Blue Key" class="unselected optional-item" src="images/icons/PM_BlueKey.png">
        <div class="colorblind-label">B</div>
    </div>
    <div class="compact-element">
        <img data-chapter="7" id="Red Key" class="unselected key-item" src="images/icons/PM_Red_Key.png">
        <div class="colorblind-label">R</div>
    </div>
    <div class="compact-element"><img data-chapter="7" id="Palace Key" class="unselected key-item" src="images/icons/PM_Palace_Key.png"></div>
    <div id="BowsersKeySlot" class="compact-element">
        <img data-chapter-key="8" id="Bowser's Castle Key" class="unselected key-item" src="images/icons/PM_Bowser_Castle_Key.png">
        <br>
        <p data-chapter-key-count="8">0/5</p>
    </div>
    <div class="compact-misc-item compact-element useless-item">
        <img data-chapter-key="14" id="Prison Key" class="unselected optional-item" src="images/icons/OddKey.gif">
        <div class="colorblind-label" style="top:10px;">P</div>
        <p data-chapter-key-count="14">0/2</p>
    </div>
    <div class="compact-misc-item compact-element koopa-koot-generated-item"><img id="Crystal Ball" class="unselected optional-item" src="images/koopa-koot-favors/Crystal_Ball_PM.png"></div>
    <div class="compact-misc-item compact-element">
        <img id="Lyrics" class="unselected optional-item" src="images/koopa-koot-favors/Lyrics_PM.png">
        <div class="colorblind-label">L</div>
    </div>
    <div class="compact-misc-item compact-element">
        <img id="Melody" class="unselected optional-item" src="images/koopa-koot-favors/PM_Melody.png">
        <div class="colorblind-label">M</div>
    </div>
    <div class="compact-misc-item compact-element useless-item">
        <img data-chapter-key="9" id="Quizmo" class="unselected optional-item" src="images/icons/ChuckQuizmo_PM.png">
        <br>
        <p data-chapter-key-count="9">0/64</p>
    </div>
    <div class="compact-misc-item compact-element useless-item">
        <img data-chapter-key="11" id="Star Piece" class="unselected optional-item" src="images/icons/Star_Piece.png">
        <br>
        <p data-chapter-key-count="11">0/96</p>
    </div>
    <div class="compact-misc-item compact-element">
        <div class="tooltip">
            <img data-chapter-key="12" id="Rip Cheato" class="unselected optional-item" src="images/icons/RipCheato.png">
            <span class="tooltiptext rip-cheato-money">Total Coins Needed: 188 (Only first 6 can be progression items)</span>
        </div>
        <br>
        <p data-chapter-key-count="12">0/11</p>
    </div>
</div>`;
