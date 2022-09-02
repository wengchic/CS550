#version 120

uniform float    uTime;        // "Time", from Animate( )
varying vec2      vST;        // texture coords

uniform float uKa, uKd, uKs;
uniform vec3 uColor;
uniform vec3 uSpecularColor;
uniform float uShininess;

uniform float uS0, uT0;
uniform float uS1, uT1;
uniform float uDs, uDt;
uniform float uSize;
uniform int uBotton;


varying vec3 vN;
varying vec3 vL;
varying vec3 vE;

void
main( )
{

    // lighting
    vec3 Normal = normalize(vN);
    vec3 Light = normalize(vL);
    vec3 Eye = normalize(vE);
    
    vec3 ambient = uKa * uColor;
    
    // only do diffuse if the light can see the point
    float d = max( dot(Normal,Light), 0. ); 
    vec3 diffuse = uKd * d * uColor;
    
    float s = 0.;
    // only do specular if the light can see the point
    if( dot(Normal,Light) > 0. ) {
        vec3 ref = normalize( reflect( -Light, Normal ) );
        s = pow( max( dot(Eye,ref),0. ), uShininess );
    }
    vec3 specular = uKs * s * uSpecularColor;
    


    // texture
    vec3 myColor = uColor;
    
    float s0 = (0.6 - ((vST.t / 0.3) * 0.6));
    float s1 = 2.5 - s0;
    if( s0 <= vST.s && vST.s < s1  && uT0 + uDt <= vST.t && vST.t <= uT1 - uDt)
    {
        // pattern color
        myColor = vec3( 0.196078, 0.6, 0.8);

    }

    ambient = uKa * myColor;
    
    // draw
    gl_FragColor = vec4( ambient + diffuse + specular, 1. );


}



