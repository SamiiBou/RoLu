//
//  CustomView9.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView9: View {
    @State public var image7Path: String = "image7_1213697"
    @State public var text8Text: String = "Babysitting"
    @State public var image8Path: String = "image8_1213701"
    @State public var text9Text: String = "200 MXN"
    @State public var image9Path: String = "image9_1213704"
    @State public var text10Text: String = "Childcare"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image7Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.789, alignment: .topLeading)
            Text(text8Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 113)
            Image(image8Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 149, height: 108, alignment: .topLeading)
                .offset(x: -8.892, y: 0.068)
            Text(text9Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.108, y: 134.068)
            CustomView10(
                image9Path: image9Path,
                text10Text: text10Text)
                .frame(width: 65.108, height: 29.368)
                .offset(x: 0.892, y: 153.7)
        }
        .frame(width: 131.108, height: 183.068, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView9_Previews: PreviewProvider {
    static var previews: some View {
        CustomView9()
    }
}
