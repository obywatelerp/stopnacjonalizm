<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet [ <!ENTITY nbsp "&#160;"> ]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="GetFeatureInfoResponse">
        <xsl:apply-templates select="Layer[@name='wojewodztwa']" />
        <xsl:apply-templates select="Layer[@name='powiaty']" />     
        <xsl:apply-templates select="Layer[@name='gminy']" />           
        <hr></hr>
        <hr></hr>        
        <xsl:apply-templates select="Layer[@name='kandydaci_w_komisji']" /> 
    </xsl:template>

    <xsl:template match="Layer[@name='wojewodztwa']">
       <xsl:if test="count(Feature) &gt; 0">
        <span>
         <xsl:for-each select="Feature">
            <p><xsl:apply-templates select="Attribute[@name='name']" /> <br/>
               kandydatów do sejmiku: <xsl:apply-templates select="Attribute[@name='liczba_k']" />
            </p>
         </xsl:for-each>
        </span>
       </xsl:if> 
    </xsl:template>
    
    <xsl:template match="Layer[@name='powiaty']">
       <xsl:if test="count(Feature) &gt; 0">
        <span>
         <xsl:for-each select="Feature">
            <p><xsl:apply-templates select="Attribute[@name='name']" /> <br/>
               kandydatów do rady: <xsl:apply-templates select="Attribute[@name='liczba_k']" />
            </p>
         </xsl:for-each>
        </span>
       </xsl:if> 
    </xsl:template>    
    
    <xsl:template match="Layer[@name='gminy']">
       <xsl:if test="count(Feature) &gt; 0">
        <span>
         <xsl:for-each select="Feature">
            <p><xsl:apply-templates select="Attribute[@name='name']" /> <br/>
               kandydatów do rad: <xsl:apply-templates select="Attribute[@name='liczba_k']" />
            </p>
         </xsl:for-each>
        </span>
       </xsl:if> 
    </xsl:template>       
    
    <xsl:template match="Layer[@name='kandydaci_w_komisji']">
       <xsl:call-template name="kandydaci"/>
    </xsl:template>
    
    <xsl:template name="kandydaci" >
       <xsl:if test="count(Feature) &gt; 0">

         <xsl:for-each select="Feature">
         <table>             
           <tr>
              <th scope="row">imię/nazwisko:</th>
              <td><xsl:apply-templates select="Attribute[@name='imie']" />&nbsp;
                  <xsl:apply-templates select="Attribute[@name='nazwisko']" />&nbsp;
                  (<xsl:apply-templates select="Attribute[@name='wiek']" />l.)
              </td>
           </tr>
           <tr>
              <th scope="row">kandyduje do:</th>
              <td><xsl:apply-templates select="Attribute[@name='kandydat_do']" /></td>
           </tr>
           <tr>
              <th scope="row">kandyduje z:</th>
              <td><xsl:apply-templates select="Attribute[@name='miejscowosc_kandydowania']" /></td>
           </tr>
           <tr>
              <th scope="row">komitet wyborczy:</th>
              <td><xsl:apply-templates select="Attribute[@name='komitet_wyborczy']" /></td>
           </tr>
           </table>
           <hr></hr>
         </xsl:for-each>
           <hr></hr>

       </xsl:if> 
    </xsl:template>


    <xsl:template match="Attribute[@name='name']" >
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='liczba_k']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='imie']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='nazwisko']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='wiek']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='kandydat_do']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='komitet_wyborczy']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='komitet_wyborczy']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

    <xsl:template match="Attribute[@name='miejscowosc_kandydowania']"> 
         <xsl:value-of select="@value" />
    </xsl:template>

</xsl:stylesheet>