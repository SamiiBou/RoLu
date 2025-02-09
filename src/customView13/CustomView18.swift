//
//  CustomView18.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView18: View {
    @State public var image17Path: String = "image17_1213738"
    @State public var text21Text: String = "Pets"
    @State public var text22Text: String = "12 Jobs"
    @State public var text23Text: String = "Pets"
    @State public var image18Path: String = "image18_1213745"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image17Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.818, alignment: .topLeading)
            Text(text21Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.054, y: 113.116)
            Text(text22Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.054, y: 134.116)
            Rectangle()
                .fill(Color(red: 0.94, green: 0.93, blue: 1.00, opacity: 1.00))
                .clipShape(RoundedRectangle(cornerRadius: 11))
                .frame(width: 56.189, height: 21.963)
                .offset(y: 153.74)
            Text(text23Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 14.054, y: 157.116)
            Image(image18Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 203, height: 110, alignment: .topLeading)
                .offset(x: -38.946, y: -1.884)
        }
        .frame(width: 131.108, height: 183.116, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView18_Previews: PreviewProvider {
    static var previews: some View {
        CustomView18()
    }
}
